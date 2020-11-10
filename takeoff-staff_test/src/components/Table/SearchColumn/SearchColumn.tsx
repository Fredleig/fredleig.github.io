import React, {useCallback} from "react";
import {Button, Input, Space} from "antd";
import {SearchOutlined} from "@ant-design/icons/lib";
import {FilterDropdownProps} from "antd/es/table/interface";
import "./SearchColumn.sass";

interface ISearchColumnProps extends FilterDropdownProps {
  title: string
  dataIndex: string;
  ref?: any
  onSearch: (selectedKeys: FilterDropdownProps["selectedKeys"], confirm: FilterDropdownProps["confirm"], dataIndex: string) => void;
  onReset: (clearFilters: FilterDropdownProps["clearFilters"]) => void
}

const SearchTableColumn: React.FC<ISearchColumnProps> = React.forwardRef( (props, ref: React.Ref<any>) => {
  const {title, dataIndex, setSelectedKeys, selectedKeys, confirm, clearFilters, onSearch, onReset} = props

  const handleSearch = useCallback(() => {
    onSearch(selectedKeys, confirm, dataIndex);
  }, [onSearch, selectedKeys, confirm, dataIndex]);

  const handleSetSelectedKeys = useCallback((ev) => {
    setSelectedKeys(ev.target.value ? [ev.target.value] : [])
  }, [setSelectedKeys])

  const handleReset = useCallback(() => {
    onReset(clearFilters)
  }, [onReset, clearFilters])

  return (
      <div className="wrapper-search">
        <Input
            ref={ref}
            placeholder={`Найти ${title}`}
            value={selectedKeys[0]}
            onChange={handleSetSelectedKeys}
            onPressEnter={handleSearch}
            className="input-search"
        />
        <Space>
          <Button
              type="primary"
              onClick={handleSearch}
              icon={<SearchOutlined />}
              size="small"
              className="button-search"
          >
            Поиск
          </Button>
          <Button onClick={handleReset} size="small" className="button-search">
            Сброс
          </Button>
        </Space>
      </div>
  )
})

export default React.memo(SearchTableColumn)

