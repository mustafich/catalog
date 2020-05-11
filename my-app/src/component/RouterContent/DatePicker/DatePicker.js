import React from "react";
import DatePicker from "react-datepicker";


import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class DataaPicker extends React.Component {
    state = {
        startDate: null,
        startDateplaceholder:""
    };

    // componentWillReceiveProps(nextProps) {
    //     debugger
    //     this.setState({
    //         ...this.state,
    //         startDate: nextProps.editTime
    //     })
    // }
    componentWillReceiveProps(nextProps){

        this.setState({
            startDateplaceholder:nextProps.editTime
        })

    }


    handleChange = date => {

    this.props.getDate(date.toLocaleDateString("ru-RU"))
    this.setState({
        startDate: date
    });
};

render()
{
    return (
        <DatePicker
            placeholderText={this.state.startDateplaceholder}
            dateFormat="dd/MM/yyyy"
            selected={this.state.startDate}
            onChange={this.handleChange}
            minDate={new Date()}
        />
    );
}
}

export default DataaPicker