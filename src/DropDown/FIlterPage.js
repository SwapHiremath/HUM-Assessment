import React from "react";
import { render } from "react-dom";
import AutoCompleteDataList from "./AutoCompleteDataList";


class FilterPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            empList: []
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.loadEmployeeName(1)
        }, 1000);
    }

    loadEmployeeName = (currentPageNo) => {
        var empListJson = (this.state.empList != undefined ? JSON.parse(JSON.stringify(this.state.empList)) : []);
        var self = this;
        this.setState({ currentPage: currentPageNo })
        var axios = require('axios');
        var config = {
            method: 'get',
            url: 'https://reqres.in/api/users?page=' + currentPageNo,
            headers: {}
        };
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data.data));
                response.data.data.map(function (data) {
                    empListJson.push(data.first_name + ' ' + data.last_name);
                })
                self.setState({ empList: empListJson });
                if (response.data.data.length > 0) { self.loadEmployeeName(currentPageNo + 1) }
            })
            .catch(function (error) {
                console.log(error);
            });

    }



    render() {
        return (
            <div className="wrapper">
                <h1>Auto-Complete Component</h1>
            
                <AutoCompleteDataList
                    AutoCompleteData={this.state.empList}
                />
            </div>
        );
    }


}

export default FilterPage;