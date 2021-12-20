import React, { useEffect } from "react";
import { IpropsModalAdd } from "../../interface";
import { Button, Checkbox, Form, Input, InputNumber, Modal } from "antd";
import { useAltaIntl } from "@shared/hook/useTranslate";
import { IFormContent, renderForm } from "@hoc/FormHelper";


const ModalAdd{{ pascalCase name }} = (props: IpropsModalAdd) => {
  const { modal, setModal, handleRefresh } = props;
  // TRANSLATE
  const {formatMessage, intl} = useAltaIntl();
  // JUST MODAL
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    setModal({ isVisible: false, dataEdit: null });
    form.resetFields();
    handleRefresh();
  };

  // JUST FORM
  const formContent: IFormContent[] = [
    { name: "accountUserName" },
    { name: "accountEmail", rules: [] }
    , { name: "accountPhone", render: ()=><InputNumber /> },
    {
      name: "accountPassword",
      render: ()=> <Input.Password />,
    },

  ]
  const [form] = Form.useForm();
  const onFinish = value => {
    //thêm xóa sửa value here
    const formSend = { ...value }
    if (modal.dataEdit) {
      //call api
      handleCancel()
    } else {
      //call api
      handleCancel()
    }
  }

  const translateFirstKey = '{{camelCase name}}'; //put your translate here

  return (
    <Modal
      className="main-modal"
      title={modal.dataEdit ? `${formatMessage("common.edit")} ${modal?.dataEdit?.tagName}` : `${formatMessage("common.add")} ${formatMessage(`${translateFirstKey}.${translateFirstKey}`)}`}
      visible={modal.isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={<>
        <Button onClick={handleCancel}>{formatMessage("common.cancel")}</Button>
        <Button type="primary" onClick={() => { form.submit() }}>{formatMessage("common.save")}</Button>
      </>}
      closable={false}
    >
      <Form
        form={form}
        className="main-form" //important
        layout="vertical" //important
        name="basic"
        onFinish={onFinish}
      >
        {
          renderForm(formContent,intl)
        }
        {modal?.dataEdit && <Form.Item
          label={formatMessage(`${translateFirstKey}.accountStatus`)}
          name={"accountStatus"}
        >
          <Checkbox>{formatMessage("common.statusActive")}</Checkbox>
        </Form.Item>}
      </Form>
    </Modal>
  );
};

export default ModalAdd{{pascalCase name}};
