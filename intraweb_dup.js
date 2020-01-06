import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { List, Typography } from 'antd';
import { Modal } from 'antd';
import { Table, Row, Col, Button, Input } from 'antd';
const data = [
    {
        key: '1',
        name: 'hrk_omb_pol',
        count: 51,
        target: 21,
        common: 10,
        duplicate: 13,
    },
    {
        key: '2',
        name: 'ktrNow_ok',
        count: 42,
        target: 21,
        common: 7,
        duplicate: 9,
    },
    {
        key: '3',
        name: 'npr_tyrjt',
        count: 43,
        target: 21,
        common: 9,
        duplicate: 8,
    },
    {
        key: '4',
        name: 'Mvnl_Out_csv',
        count: 13,
        target: 22,
        common: 4,
        duplicate: 2,
    },
    {
        key: '5',
        name: 'Jnl_Out',
        count: 15,
        target: 21,
        common: 3,
        duplicate: 3,
    },
];

class Basic extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: false };
    }
    showModal = () => {
        this.setState({
          visible: true,
        });
      };
      handleCancel = () => {
        this.setState({ visible: false });
      };
    render() {
        const { Search } = Input;
        const { visible } = this.state;
        const columns = [
            {
                title: 'DprName',
                dataIndex: 'name',
                key: 'name',
                columnWidth:20,
                render: text => <a>{text}</a>,
            },
            {
                title: 'TotalCount',
                dataIndex: 'count',
                key: 'count',
                columnWidth:20,
                sorter: (a, b) => a.count - b.count,
            },
            {
                title: 'Target',
                dataIndex: 'target',
                key: 'target',
                columnWidth:20,
                sorter: (a, b) => a.target - b.target,
            },
            {
                title: 'AccCommon',
                dataIndex: 'common',
                key: 'common',
                columnWidth:20,
                sorter: (a, b) => a.common - b.common,
            },
            {
                title: 'Duplicate',
                dataIndex: 'duplicate',
                key: 'duplicate',
                columnWidth:20,
                sorter: (q, h) => q.duplicate - h.duplicate,
            },
            {
                title: 'CSV Download',
                key: 'download',
                columnWidth:20,
                dataIndex: 'download',
                render: () => (
                    <span>
                        <Button type="primary" icon="download"></Button>
                    </span>
                ),
            },
        ];

        const listData = [
            
          ];
        const detailColumns = [
            {
                title: 'DprName',
                dataIndex: 'name',
                key: 'name',
                columnWidth:20,
                render: text => <a>{text}</a>,
            },
            {
                title: 'TotalCount',
                dataIndex: 'count',
                columnWidth:20,
                key: 'count',
            },
            {
                title: 'Target',
                dataIndex: 'target',
                columnWidth:20,
                key: 'target',
            },
            {
                title: 'shared Dpr',
                key: 'download',
                columnWidth:20,
                dataIndex: 'download',
                render: () => (
                    <span>
                        <Button type="primary" icon="link" onClick={this.showModal} ></Button>
                        <Modal
          visible={visible}
          title="Shared DPR"
          onCancel={this.handleCancel}
          footer={[]}
        >
         
    <List
      size="small"
      header={<div>shared Dpr</div>}
      footer={<div></div>}
      bordered
      dataSource={listData}
      renderItem={item => <List.Item>{item}</List.Item>}
    />
        </Modal>
                    </span>
                ),
            },
        ];

        return (
            <div>
                <Row type="flex" justify="start">
                    <Col span={14}>
                        <Search
                            placeholder="search By Dpr Name"
                            onSearch={value => console.log(value)}
                            style={{ width: 300 , marginBottom:10, marginTop:10}}
                        />
                        <Table columns={columns} bordered size="middle" style={{ width: "40%" }} dataSource={data} />
                    </Col>
                    <Col span={8}>
                    <Search
                            placeholder="search By Dpr Name"
                            onSearch={value => console.log(value)}
                            style={{ width: 300 , marginBottom:10, marginTop:10,marginLeft:"90%"}}
                        />
                    <Table columns={detailColumns} bordered size="middle" style={{width: "50%", marginLeft:"20%"}} dataSource={data} />
                    </Col>
                </Row>
            </div>
        )
    }
}
export default withRouter(connect(null)(Basic));
