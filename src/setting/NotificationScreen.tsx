import React, { ReactElement } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import DateButton from './DateButton';
import { WeekDay } from '../interface/WeekDay';

function NotificationScreen(): ReactElement {
  const [selectedWeekDay, setSelectedWeekDay] = React.useState<WeekDay>('월');
  const weekdays: readonly WeekDay[] = ['월', '화', '수', '목', '금'] as const;
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
      <View style={styles.timeContainer} />
    </View>
  );
}

type Style = {
  container: ViewStyle;
  weekDayContainer: ViewStyle;
  timeContainer: ViewStyle;
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
    backgroundColor: 'yellow',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotificationScreen;
