import React, { ReactElement } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import DateButton from './DateButton';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { WeekDay } from '../interface/WeekDay';

function NotificationScreen(): ReactElement {
  const [selectedWeekDay, setSelectedWeekDay] = React.useState<WeekDay>('월');
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);
  const weekdays: readonly WeekDay[] = ['월', '화', '수', '목', '금'] as const;
  const onChange = (event: DateTimePickerEvent, date?: Date) => {
    setDate(date || new Date());
  };
  const onPress = () => setShow(true);
  const onDateButtonPressed = (weekDay: WeekDay) => setSelectedWeekDay(weekDay);
  return (
    <View style={styles.container}>
      <View style={styles.weekDayContainer}>
        {weekdays.map(weekDay => (
          <DateButton
            key={weekDay}
            weekDay={weekDay}
            isPressed={weekDay === selectedWeekDay}
            onPressed={onDateButtonPressed}
          />
        ))}
      </View>
      <View style={styles.timeContainer}>
        <Pressable hitSlop={20} onPress={onPress}>
          <Text style={styles.buttonText}>{'알림 시간 설정'}</Text>
        </Pressable>
        {show && Platform.OS === 'ios' && (
          <DateTimePicker
            onChange={onChange}
            is24Hour={true}
            locale={'ko-KR'}
            mode={'time'}
            value={date}
          />
        )}
      </View>
      {show && Platform.OS === 'android' && (
        <View
          style={{
            backgroundColor: 'black',
            opacity: 0.8,
            ...StyleSheet.absoluteFillObject,
          }}>
          <DateTimePicker
            onChange={onChange}
            is24Hour={true}
            mode={'time'}
            value={date}
          />
        </View>
      )}
    </View>
  );
}

type Style = {
  container: ViewStyle;
  weekDayContainer: ViewStyle;
  timeContainer: ViewStyle;
  buttonText: TextStyle;
};

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  weekDayContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  timeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 40,
  },
});

export default NotificationScreen;
