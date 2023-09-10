import { ReactElement, useCallback } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { WeekDay } from '../interface/WeekDay';

type Props = {
  weekDay: WeekDay;
  isPressed: boolean;
  onPressed: (weekDay: WeekDay) => void;
};

function DateButton({ weekDay, isPressed, onPressed }: Props): ReactElement {
  const onPress = useCallback(() => {
    onPressed(weekDay);
  }, [onPressed, weekDay]);

  return (
    <Pressable onPress={onPress} hitSlop={20}>
      <Text style={isPressed ? styles.selectedText : styles.notSelectedText}>
        {weekDay}
      </Text>
    </Pressable>
  );
}

type Style = {
  container: ViewStyle;
  selectedText: TextStyle;
  notSelectedText: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  container: { flex: 1, backgroundColor: 'white' },
  selectedText: { color: 'red', fontWeight: 'bold', fontSize: 20 },
  notSelectedText: { color: 'black', fontSize: 20 },
});

export default DateButton;
