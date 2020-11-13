import React from "react";
import "./Contacts.sass";
import { Button, Form, Modal, Table } from "antd";
import EditableCell from "../../components/Table/EditTableCell/EditTableCell";
import Ajax from "../../utils/Ajax/Ajax";
import OperationTable from "../../components/Table/OperationTable/OperationTable";
import { boundMethod } from "autobind-decorator";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons/lib";
import { FilterDropdownProps } from "antd/es/table/interface";
import SearchTableColumn from "../../components/Table/SearchColumn/SearchColumn";
import { FormInstance } from "antd/es/form";
import { History } from "history";
import withForm from "../../Hocs/withForm";
import Header from "../../components/Header/Header";
import { ColumnProps } from "antd/es/table";
import { ColumnsType } from "antd/lib/table/interface";

enum ENameColumn {
  key = "key",
  name = "name",
  tel = "tel",
  email = "email",
}

interface IColumnProps<T = any> extends ColumnProps<T> {
  editable?: boolean;
}

type TRecord = {
  [Key in ENameColumn]: string;
};

type TData = {
  id: number | string;
  name?: string;
  tel?: string;
  email?: string;
};

interface IContactsState {
  editingKey: string;
  data: TData[];
  searchText: string | number;
  searchedColumn: string;
}

interface IContactsProps {
  form: FormInstance;
  history?: History;
}

const tableComponent = {
  body: {
    cell: EditableCell,
  },
};

const highlightStyle = { backgroundColor: "#ffc069", padding: 0 };
const pathContacts = "user_contacts";

class Contacts extends React.PureComponent<IContactsProps, IContactsState> {
  private readonly emptyRow = "emptyRowKey";
  private readonly searchInput: React.RefObject<any> = React.createRef();
  private userName: string | null = null;
  public state = {
    data: [],
    editingKey: "",
    searchText: "",
    searchedColumn: "",
  };

  public componentDidMount(): void {
    this.userName = localStorage.getItem("userName");
    Ajax.GET(pathContacts, `user_name=${this.userName}`)
      .then((data) => this.setState({ data }))
      .catch((error) => this.getErrorModal(error));
  }

  private getErrorModal(error: string) {
    Modal.error({ title: "Error", content: error.toString() });
  }

  private get columns() {
    return [
      {
        title: "Имя",
        dataIndex: ENameColumn.name,
        width: "30%",
        editable: true,
        ...this.getColumnSearchProps(ENameColumn.name, "имя"),
      },
      {
        title: "Номер телефона",
        dataIndex: ENameColumn.tel,
        width: "30%",
        editable: true,
        ...this.getColumnSearchProps(ENameColumn.tel, "номер телефона"),
      },
      {
        title: "Почта",
        dataIndex: ENameColumn.email,
        width: "30%",
        editable: true,
        ...this.getColumnSearchProps(ENameColumn.email, "почту"),
      },
      {
        title: "Операции",
        width: "10%",
        dataIndex: "operation",
        render: (_: any, record: TRecord) => this.getOperationsColumn(record),
      },
    ] as IColumnProps[];
  }

  private getColumnSearchProps = (dataIndex: any, title: string) => ({
    filterDropdown: (filterProps: FilterDropdownProps) => (
      <SearchTableColumn
        ref={this.searchInput}
        dataIndex={dataIndex}
        title={title}
        onSearch={this.handleSearch}
        onReset={this.handleReset}
        {...filterProps}
      />
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value: any, record: TRecord[]) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => this.searchInput.current.select(), 100);
      }
    },
    render: (text: any) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={highlightStyle}
          searchWords={[this.state.searchText]}
          autoEscape={true}
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  @boundMethod
  private handleSearch(
    selectedKeys: FilterDropdownProps["selectedKeys"],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: string
  ) {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  }

  @boundMethod
  private handleReset(clearFilters: FilterDropdownProps["clearFilters"]) {
    clearFilters?.();
    this.setState({ searchText: "" });
  }

  private isEditing(record: TRecord) {
    return record.key === this.state.editingKey;
  }

  @boundMethod
  private handleEdit(record: TRecord) {
    this.state.editingKey === this.emptyRow && this.deleteNewRow();
    this.props.form.setFieldsValue({ ...record });
    this.setState({ editingKey: record.key });
  }

  @boundMethod
  private handleEditing(record: TRecord) {
    const { form } = this.props;
    const fieldValues = form.getFieldsValue();
    form.validateFields().then(() => {
      Ajax.PUT(`${pathContacts}/${record.key}`, {
        user_name: this.userName,
        ...fieldValues,
      })
        .catch((error: string) => this.getErrorModal(error))
        .then(() => {
          const newData: TData[] = [...this.state.data];
          const index = newData.findIndex((item: TData) => record.key === item.id);
          newData.splice(index, 1, { id: record.key, ...fieldValues });
          this.setState({ data: newData, editingKey: "" });
        });
    });
  }

  @boundMethod
  private handleAddContact() {
    const { form } = this.props;
    const fieldValues = form.getFieldsValue();
    form.validateFields().then(() => {
      Ajax.POST(pathContacts, { user_name: this.userName, ...fieldValues })
        .catch((error: string) => this.getErrorModal(error))
        .then((responseData) => {
          const newData: TData[] = [...this.state.data];
          const index = newData.findIndex((item: TData) => this.emptyRow === item.id);
          newData.splice(index, 1, { id: responseData.id, ...fieldValues });
          this.setState({ data: newData, editingKey: "" });
        });
    });
  }

  @boundMethod
  private handleDelete(record: TRecord) {
    Ajax.DELETE(`${pathContacts}/${record.key}`)
      .catch((error: string) => this.getErrorModal(error))
      .then(() => {
        const newData = [...this.state.data].filter((item: TData) => record.key !== item.id);
        this.setState({ data: newData });
      });
  }

  @boundMethod
  private handleCancelSave() {
    this.state.editingKey === this.emptyRow && this.deleteNewRow();
    this.setState({ editingKey: "" });
  }

  @boundMethod
  private handleAddRow() {
    this.setState({
      data: [...this.state.data, { id: this.emptyRow }],
      editingKey: this.emptyRow,
    });
    this.props.form.resetFields([ENameColumn.name, ENameColumn.tel, ENameColumn.email]);
  }

  private deleteNewRow() {
    const newData = [...this.state.data].filter((item: TData) => this.emptyRow !== item.id);
    this.setState({ data: newData });
  }

  private getDataSource() {
    return this.state.data.map((item: TData) => ({
      key: item.id,
      name: item[ENameColumn.name],
      tel: item[ENameColumn.tel],
      email: item[ENameColumn.email],
    }));
  }

  private columnsMerge() {
    return this.columns.map((col: IColumnProps) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record: TRecord) => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    }) as ColumnsType<any>;
  }

  private getOperationsColumn(record: TRecord) {
    return (
      <OperationTable
        isEditing={this.isEditing(record)}
        onSave={record.key === this.emptyRow ? this.handleAddContact : this.handleEditing}
        onClose={this.handleCancelSave}
        onDelete={this.handleDelete}
        onEdit={this.handleEdit}
        record={record}
      />
    );
  }

  public render(): React.ReactNode {
    const { form } = this.props;
    return (
      <>
        <Header />
        <div className="wrapper_table">
          <div className="table-content">
            <Button
              type="primary"
              disabled={this.state.editingKey === this.emptyRow}
              className="button_add-contact"
              onClick={this.handleAddRow}
            >
              Добавить контакт
            </Button>
            <Form form={form} component={false} className="table-contacts">
              <Table
                components={tableComponent}
                columns={this.columnsMerge()}
                dataSource={this.getDataSource()}
              />
            </Form>
          </div>
        </div>
      </>
    );
  }
}

export default withForm(Contacts);
