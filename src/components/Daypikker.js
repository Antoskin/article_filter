import React, {Component} from 'react';
// import DayPicker from 'react-day-picker';
import Helmet from 'react-helmet';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';


export default class Calendar extends Component {
    static defaultProps = {
        numberOfMonths: 1,
      };
      constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
        this.state = this.getInitialState();
      }
      getInitialState() {
        return {
          from: undefined,
          to: undefined,
        };
      }
      handleDayClick(day) {
        const range = DateUtils.addDayToRange(day, this.state);
        this.setState(range);
      }
      handleResetClick() {
        this.setState(this.getInitialState());
      }
      render() {
        const { from, to } = this.state;
        const modifiers = { start: from, end: to };
        return (
          <div className="RangeExample">
            <p>
              {!from && !to && 'от..'}
              {from && !to && 'до..'}
              {from &&
                to &&
                `Выбрано ${from.toLocaleDateString()} -
                    ${to.toLocaleDateString()}`}{' '}
              {from &&
                to && (
                  <button className="link" onClick={this.handleResetClick}>
                    Reset
                  </button>
                )}
            </p>
            <DayPicker
              className="Selectable"
              numberOfMonths={this.props.numberOfMonths}
              selectedDays={[from, { from, to }]}
              modifiers={modifiers}
              onDayClick={this.handleDayClick}
            />
            <Helmet>
              <style>{`
                    .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                        background-color: #f0f8ff !important;
                        color: tomato;
                    }
                    .Selectable .DayPicker-Day {
                        border-radius: 0 !important;
                    }
                    .Selectable .DayPicker-Day--start {
                        border-top-left-radius: 50% !important;
                        border-bottom-left-radius: 50% !important;
                    }
                    .Selectable .DayPicker-Day--end {
                        border-top-right-radius: 50% !important;
                        border-bottom-right-radius: 50% !important;
                    }
                    `}</style>
            </Helmet>
          </div>
        );
      }
}