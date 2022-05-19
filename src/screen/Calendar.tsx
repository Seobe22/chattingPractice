import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Platform,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  TouchableWithoutFeedback,
  GestureResponderEvent,
} from 'react-native';
import {
  Calendar as Calendars,
  DateData,
  LocaleConfig,
} from 'react-native-calendars';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import DateTimePickerModal, {
  DateTimePickerProps,
} from 'react-native-modal-datetime-picker';
import {useSelectTimes} from '../zustand/selectDate';
dayjs.extend(isSameOrAfter);
LocaleConfig.locales['kor'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  // today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'kor';

type SelectedTimeData = {
  time: string;
  date: string;
};

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  onHideBottomSheet: (event: GestureResponderEvent) => void;
  onSelectDateAndTime: (
    date: string,
    time: string,
    displayDate: string,
    displayTimes: string,
  ) => void;
};
export default function Calendar({
  isModalOpen,
  setIsModalOpen,
  onHideBottomSheet,
  onSelectDateAndTime,
}: Props) {
  const minDate = String(dayjs().format('YYYY-MM-DD HH:mm'));
  const currentHour = dayjs().hour();
  const [currentTime, setCurrentTime] = useState<string>(
    currentHour > 12
      ? '오후 ' + dayjs().format('hh:mm')
      : '오전 ' + dayjs().format('hh:mm'),
  );
  const [markDates, setMarkDates] = useState<any>({
    [minDate]: {
      selected: true,
      selectedColor: 'rgba(23, 84, 252, 1)',
    },
  });
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDay, setSelectedDay] = useState<string>(minDate);
  const [selectedTimeData, setSelectedTimeData] =
    useState<SelectedTimeData | null>(null);
  const [yoil, setYoil] = useState<string>('');
  const maxMonth = Number(dayjs().format('MM')) + 2;
  const maxYear = Number(dayjs().format('MM'));
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const maxDate =
    maxMonth > 12
      ? String(
          dayjs().format(
            `${maxYear + 1}-${
              maxMonth - 12 < 10 ? '0' + String(maxMonth - 12) : maxMonth - 12
            }-DD`,
          ),
        )
      : String(
          dayjs().format(
            `YYYY-${maxMonth < 10 ? '0' + String(maxMonth) : maxMonth}-DD`,
          ),
        );
  const markDate = (day: DateData) => {
    const selectedDate = day.dateString;
    setMarkDates({
      [selectedDate]: {
        selected: true,
        selectedColor: 'rgba(23, 84, 252, 1)',
      },
    });
    setSelectedDay(selectedDate);
    setDate(new Date(selectedDate));
  };

  const showDatePicker = () => {
    setIsVisible(true);
  };

  const hideDatePicker = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const days = dayjs(selectedDay).format('dddd');
    switch (days) {
      case 'Monday':
        setYoil('월요일');
        break;
      case 'Tuesday':
        setYoil('화요일');
        break;
      case 'Wednesday':
        setYoil('수요일');
        break;
      case 'Thursday':
        setYoil('목요일');
        break;
      case 'Friday':
        setYoil('금요일');
        break;
      case 'Saturday':
        setYoil('토요일');
        break;
      case 'Sunday':
        setYoil('일요일');
        break;
      default:
        null;
    }
  }, [selectedDay]);

  const handleConfirm = (value: Date) => {
    const selectedHour = dayjs(value).hour();
    const selectedMinute = dayjs(value).minute();
    const currentTimes = dayjs().format('YYYY-MM-DD');
    const selectedDates = dayjs(value).format('YYYY-MM-DD');
    if (
      selectedHour < dayjs().hour() &&
      dayjs(currentTimes).isSame(selectedDates)
    ) {
      return Platform.OS === 'ios'
        ? Alert.alert('알림', '예약시간은 최소 20분 이후부터 설정 가능합니다.')
        : ToastAndroid.showWithGravity(
            '예약시간은 최소 20분 이후부터 설정 가능합니다.',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
    } else if (
      selectedHour === dayjs().hour() &&
      selectedMinute <= dayjs().minute() &&
      dayjs(currentTimes).isSame(selectedDates)
    ) {
      return Platform.OS === 'ios'
        ? Alert.alert('알림', '예약시간은 최소 20분 이후부터 설정 가능합니다.')
        : ToastAndroid.showWithGravity(
            '예약시간은 최소 20분 이후부터 설정 가능합니다.',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
    } else {
      setCurrentTime(
        selectedHour > 12
          ? `오후 ${selectedHour - 12}:${
              selectedMinute === 0
                ? '00'
                : selectedMinute < 10
                ? '0' + String(selectedMinute)
                : selectedMinute
            }`
          : `오전 ${selectedHour}:${
              selectedMinute === 0
                ? '00'
                : selectedMinute < 10
                ? '0' + String(selectedMinute)
                : selectedMinute
            }`,
      );
      setSelectedTimeData({
        time: `${selectedHour}:${selectedMinute}`,
        date: selectedDay,
      });
      hideDatePicker();
    }
  };

  const onPressComplete = () => {
    onSelectDateAndTime(
      selectedDay,
      selectedTimeData?.time as string,
      `${selectedDay} ${yoil}`,
      currentTime,
    );
  };

  return (
    <>
      <DateTimePickerModal
        isVisible={isVisible}
        display="spinner"
        mode="time"
        onCancel={hideDatePicker}
        minuteInterval={10}
        onConfirm={handleConfirm}
        confirmTextIOS="선택"
        cancelTextIOS="취소"
        date={date}
      />
      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            {dayjs(selectedDay).format('M월 DD일') + ' ' + yoil}
          </Text>
        </View>
        <View style={styles.calendarContainer}>
          <Calendars
            minDate={minDate}
            maxDate={maxDate}
            enableSwipeMonths={true}
            markedDates={markDates}
            monthFormat={'yyyy년 MMMM'}
            onDayPress={markDate}
            theme={{
              arrowColor: 'rgba(23, 84, 252, 1)',
              dayTextColor: '#333333',
              textDisabledColor: 'rgba(51, 51, 51, 0.1)',
            }}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.timeButton}
              onPress={showDatePicker}>
              <Text style={styles.text}>{currentTime}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkButton}
              onPress={onPressComplete}>
              <Text style={styles.text}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  dateContainer: {
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f4',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    lineHeight: 20.27,
  },
  calendarContainer: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    justifyContent: 'center',
  },
  selectedDateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginTop: 8,
    width: '100%',
    backgroundColor: 'rgba(23, 84, 252, 0.1)',

    borderRadius: 5,
  },
  emptySpace: {
    width: '100%',
    // height: '100%',
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    marginTop: 30,
  },
  timeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    width: '100%',
    backgroundColor: '#7694ba',
    borderRadius: 3,
  },
  checkButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    marginTop: 16,
    width: '100%',
    backgroundColor: '#1754FC',
    borderRadius: 3,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: 23.17,
  },
});
