import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Vibration
} from "react-native";

export default class Polomoro extends React.Component {
  constructor() {
    super();
    this.state = {
      workCount: 1500,
      breakCount: 300,
      count: 1500,
      isBreak: false,
      isPaused: false
    };
    this.updateTime = this.updateTime.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.updateWorkTimeMinutes = this.updateWorkTimeMinutes.bind(this);
    this.updateWorkTimeSeconds = this.updateWorkTimeSeconds.bind(this);
    this.updateBreakTimeMinutes = this.updateBreakTimeMinutes.bind(this);
    this.updateBreakTimeSeconds = this.updateBreakTimeSeconds.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.updateTime, 1000);
  }

  updateBreakTimeMinutes(e) {
    let time = e.nativeEvent.text.replace(/^0+/, "");
    if (time == "") time = "0";
    this.setState(prevState => {
      const diff = parseInt(time) - parseInt(prevState.breakCount / 60);
      return { breakCount: prevState.breakCount + diff * 60 };
    });
  }

  updateBreakTimeSeconds(e) {
    let time = e.nativeEvent.text.replace(/^0+/, "");
    if (time == "") time = "0";
    this.setState(prevState => {
      const diff = parseInt(time) - parseInt(prevState.breakCount % 60);
      return { breakCount: prevState.breakCount + diff };
    });
  }

  updateWorkTimeMinutes(e) {
    let time = e.nativeEvent.text.replace(/^0+/, "");
    if (time == "") time = "0";
    this.setState(prevState => {
      const diff = parseInt(time) - parseInt(prevState.workCount / 60);
      return { workCount: prevState.workCount + diff * 60 };
    });
  }

  updateWorkTimeSeconds(e) {
    let time = e.nativeEvent.text.replace(/^0+|\D/g, "");
    if (time == "") time = "0";
    this.setState(prevState => {
      const diff = parseInt(time) - parseInt(prevState.workCount % 60);
      return { workCount: prevState.workCount + diff };
    });
  }

  updateTime() {
    if (this.state.count === 0) {
      Vibration.vibrate([500, 500, 500]);
      this.setState(prevState => {
        return {
          isBreak: !prevState.isBreak,
          count: prevState.isBreak ? prevState.workCount : prevState.breakCount
        };
      });
    } else {
      this.setState(prevState => {
        return {
          count: prevState.count - 1
        };
      });
    }
  }

  toggleTimer() {
    if (this.state.isPaused) {
      this.interval = setInterval(this.updateTime, 1000);
    } else {
      clearInterval(this.interval);
    }
    this.setState(prevState => {
      return { isPaused: !prevState.isPaused };
    });
  }

  resetTimer() {
    this.setState(prevState => {
      return {
        count: prevState.isBreak ? prevState.breakCount : prevState.workCount
      };
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.mainText}>
          {this.state.isBreak ? "BREAK TIMER" : "WORK TIMER"}
        </Text>
        <Text style={styles.mainText}>{`${parseInt(
          this.state.count / 60
        )} : ${this.state.count % 60}`}</Text>
        <View style={styles.row}>
          <Button
            title={this.state.isPaused ? "RESUME" : "PAUSE"}
            onPress={this.toggleTimer}
            style={styles.button}
          ></Button>
          <Button
            title="RESET"
            onPress={this.resetTimer}
            style={styles.button}
          ></Button>
        </View>
        <View style={styles.spacing}>
          <Text style={styles.heading}>Work Time:</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mins:</Text>
            <TextInput
              onChange={this.updateWorkTimeMinutes}
              style={styles.input}
              value={`${parseInt(this.state.workCount / 60)}`}
            ></TextInput>
            <Text style={styles.label}>Seconds:</Text>
            <TextInput
              onChange={this.updateWorkTimeSeconds}
              style={styles.input}
              value={`${parseInt(this.state.workCount % 60)}`}
            ></TextInput>
          </View>
        </View>
        <View style={styles.spacing}>
          <Text style={styles.heading}>Break Time:</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mins:</Text>
            <TextInput
              onChange={this.updateBreakTimeMinutes}
              style={styles.input}
              value={`${parseInt(this.state.breakCount / 60)}`}
            ></TextInput>
            <Text style={styles.label}>Seconds:</Text>
            <TextInput
              onChange={this.updateBreakTimeSeconds}
              style={styles.input}
              value={`${parseInt(this.state.breakCount % 60)}`}
            ></TextInput>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  mainText: {
    fontWeight: "bold",
    fontSize: 40
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "stretch",
    alignItems: "center",
    marginTop: 10
  },
  button: {
    color: "green"
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  input: {
    width: 80,
    borderBottomColor: "gray",
    borderBottomWidth: 1
  },
  label: {
    marginRight: 20
  },
  heading: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 18
  },
  spacing: {
    marginTop: 30
  }
});
