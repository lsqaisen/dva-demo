import { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router';
import { Form, Input, Select, Modal } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
import styles from './Stack.less';

class AddStack extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { network, addstack_visible, addstack_confirmLoading, AddStack, cancelAddStack } = this.props;
        const { getFieldDecorator, validateFields, resetFields } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <Modal
                maskClosable={false}
                wrapClassName="vertical-center-modal"
                title="添加应用"
                visible={addstack_visible}
                confirmLoading={addstack_confirmLoading}
                onOk={() => { validateFields((error, value) => { if (!error) AddStack(value, resetFields); }) }}
                onCancel={cancelAddStack}
            >
                <Form >
                    <FormItem
                        {...formItemLayout}
                        label="应用名称"
                    >
                        {getFieldDecorator(`name`, {
                            initialValue: "",
                            rules: [{ required: true, message: '应用名称不能为空!' }, { validator: (rule, value, callback) => { callback() } }],
                        })(<Input />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="子网"
                    >
                        {getFieldDecorator(`ippool`, {
                            initialValue: "none",
                            rules: [{ required: true, message: '子网必须选择!' }],
                        })(
                            <Select allowClear>
                                <Option key="none">默认</Option>
                                {(network || []).map(v => <Option key={v.cidr}>{v.cidr}</Option>)}
                            </Select>
                            )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="应用描述"
                    >
                        {getFieldDecorator(`desc`, {
                            initialValue: "",
                        })(<Input type='textarea' autosize={{ minRows: 4, maxRows: 4 }} />)}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

AddStack.propTypes = {
    network: PropTypes.array.isRequired,
    addstack_visible: PropTypes.bool.isRequired,
    addstack_confirmLoading: PropTypes.bool.isRequired,
    AddStack: PropTypes.func.isRequired,
    cancelAddStack: PropTypes.func.isRequired,
}

export default Form.create()(AddStack);