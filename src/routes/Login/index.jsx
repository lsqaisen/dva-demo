import { Component } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types'
import { Link } from 'dva/router';
import { Card, Form, Select, Icon, Input, Row, Col, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
//less
import styles from "./index.less";

class Login extends Component {
    constructor(props) {
        super(props);
    }
    handleOk() {
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                this.props.dispatch({ type: 'login/login', payload: values })
            }
        })
    }
    render() {
        const { list, loading } = this.props.login;
        console.log(list)
        const { getFieldDecorator, validateFields } = this.props.form;
        return (
            <div className={styles.loginbox}>
                <div className={styles.login}>
                    <Card>
                        <div className={styles.img}>
                            <img src="/ui/oem/logo.png" alt="登录log" />
                            <div className={styles._span}>
                                <span className={styles.title}>EcOS</span>
                                <span className={styles.tip}>kubernetes</span>
                            </div>
                        </div>
                        <Form>
                            <FormItem>
                                {getFieldDecorator('username', {
                                    rules: [{ required: 'true', message: '请输入用户名' }]
                                })(
                                    <Input
                                        placeholder="用户名"
                                        prefix={<Icon type="user" style={{ fontSize: 14 }} />}
                                        addonAfter={<Select defaultValue={`buildInUser`} style={{ width: 110 }}>
                                            <Option key={`buildInUser`}>内置用户</Option>
                                            {list.map(v => <Option key={v}>{v}</Option>)}
                                        </Select>} />
                                    )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码' }]
                                })(<Input prefix={<Icon type="lock" style={{ fontSize: 14 }} />} size="large" type='password' placeholder="密码" />)}
                            </FormItem>
                            <Row style={{ fontSize: '14px' }}>
                                <Col span={18}></Col>
                                <Col span={6} style={{ textAlign: 'right', paddingRight: '5px', marginBottom: '8px' }}>
                                    {<Link to='/ui/changepwd'>忘记密码</Link>}
                                </Col>
                            </Row>
                            <FormItem>
                                <Button type='primary'
                                    style={{ width: '100%' }}
                                    type="primary"
                                    loading={loading}
                                    onClick={() => { this.handleOk() }}
                                >登录</Button>
                            </FormItem>
                        </Form>
                    </Card>
                </div >
            </div>
        )
    }
}

// const Login = ({ form, dispatch, login }) => {
//     const { list, loading } = login;
//     console.log(list)
//     const { getFieldDecorator, validateFields } = form;
//     function handleOk() {
//         validateFields((errors, values) => {
//             if (!errors) {
//                 dispatch({ type: 'login/login', payload: values })
//             }
//         })
//     }
//     return (
//         <div className={styles.loginbox}>
//             <div className={styles.login}>
//                 <Card>
//                     <div className={styles.img}>
//                         <img src="/ui/oem/logo.png" alt="登录log" />
//                         <div className={styles._span}>
//                             <span className={styles.title}>EcOS</span>
//                             <span className={styles.tip}>kubernetes</span>
//                         </div>
//                     </div>
//                     <Form>
//                         <FormItem>
//                             {getFieldDecorator('username', {
//                                 rules: [{ required: 'true', message: '请输入用户名' }]
//                             })(
//                                 <Input
//                                     placeholder="用户名"
//                                     prefix={<Icon type="user" style={{ fontSize: 14 }} />}
//                                     addonAfter={<Select defaultValue={`buildInUser`} style={{ width: 110 }}>
//                                         <Option key={`buildInUser`}>内置用户</Option>
//                                         {list.map(v => <Option key={v}>{v}</Option>)}
//                                     </Select>} />
//                                 )}
//                         </FormItem>
//                         <FormItem>
//                             {getFieldDecorator('password', {
//                                 rules: [{ required: true, message: '请输入密码' }]
//                             })(<Input prefix={<Icon type="lock" style={{ fontSize: 14 }} />} size="large" type='password' placeholder="密码" />)}
//                         </FormItem>
//                         <Row style={{ fontSize: '14px' }}>
//                             <Col span={18}></Col>
//                             <Col span={6} style={{ textAlign: 'right', paddingRight: '5px', marginBottom: '8px' }}>
//                                 {<Link to='/ui/changepwd'>忘记密码</Link>}
//                             </Col>
//                         </Row>
//                         <FormItem>
//                             <Button type='primary'
//                                 style={{ width: '100%' }}
//                                 type="primary"
//                                 loading={loading}
//                                 onClick={() => { handleOk() }}
//                             >登录</Button>
//                         </FormItem>
//                     </Form>
//                 </Card>
//             </div >
//         </div>
//     )
// }

Login.propTypes = {
    form: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
}

export default connect(props => ({ ...props }))(Form.create({})(Login));