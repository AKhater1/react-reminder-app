import React, {Component} from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { add_Reminder , remove_Reminder , clear_Reminder } from '../actions'

class App extends Component {

  state = {
    text: '',
    date: new Date()
  }

  render_Reminders = () => {
    const {reminders} = this.props
    return (
      <ul className="list-group">
        {
          reminders.map(reminder => {
            return (
              <li key={reminder.id} className="list-group-item" >
                <div>{reminder.text}</div>
                <div>{moment(new Date(reminder.date)).fromNow()}</div>
                <div className="remove btn btn-danger" onClick={() => this.props.remove_Reminder(reminder.id)}>X</div> 
              </li>
            )
          })
        }
      </ul>
    )
  }

  render() {
    console.log(this.render_Reminders())
    return (
      <div className="App">

        <img src="" alt=""/>

        <div className="reminder-title">
          <h2>What should you do?</h2>
        </div>

        <input className="form-control" 
         type="text"
         placeholder="I will do......." 
         value={this.state.text}
         onChange={(e) => this.setState({text: e.target.value})}
         />

        <DatePicker
          className="form-control"
          value={this.state.date}
          placeholderText="Enter Date"
          selected={this.state.date}
          onChange={date => {this.setState({date})}}
          showTimeSelect
          timeFormat="HH:mm"
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />

        <button className="btn btn-primary btn-block" 
         onClick={ () => {
         this.props.add_Reminder(this.state.text , this.state.date)
         this.setState({text: '' , date: ''})
         }}
        >
         Add Reminder
        </button>

          {this.render_Reminders()}

        <button className="btn btn-danger btn-block"
          onClick={() => this.props.clear_Reminder()}
        >
          Clear Reminders
        </button>
      </div>
    )
  }
}

// function mapStateToProps(state) {
//   return {
//     reminders: state
//   }
// }


// function mapDispatchToProps(dispatch) {
//   return {
//     add_Reminder: () => dispatch(add_Reminder())
//   }
// }

export default connect(state => {
  return {
    reminders: state
  }
}, {add_Reminder, remove_Reminder, clear_Reminder})
(App);
