import { CloseOutlined, DeleteOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import React, { useCallback } from "react";
import "./OperationTable.sass";

interface IOperationTableProps {
  isEditing: boolean;
  record: any;
  onEdit: (record: any) => void;
  onDelete: (record: any) => void;
  onClose: () => void;
  onSave: (record: any) => void;
}

const OperationTable: React.FC<IOperationTableProps> = (props) => {
  const { isEditing, onSave, onEdit, onDelete, onClose, record } = props;

  const handleSave = useCallback(() => {
    onSave(record);
  }, [onSave, record]);

  const handleEdit = useCallback(() => {
    onEdit(record);
  }, [onEdit, record]);

  const handleDelete = useCallback(() => {
    onDelete(record);
  }, [onDelete, record]);

  if (isEditing) {
    return (
      <span>
        <SaveOutlined className="icon-operation" onClick={handleSave} />
        <CloseOutlined className="icon-operation" onClick={onClose} />
      </span>
    );
  }

  return (
    <span>
      <EditOutlined className="icon-operation" onClick={handleEdit} />
      <DeleteOutlined className="icon-operation" onClick={handleDelete} />
    </span>
  );
};

export default React.memo(OperationTable);
