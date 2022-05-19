import React from 'react';
import {
  Modal,
  View,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {RequestProcess} from '../screen/Register';

type Props = {
  isShowDateTimePicker: boolean;
  onChangeDate: (e: DateTimePickerEvent, date: Date | undefined) => void;
  setIsShowDateTimePicker: () => void;
  requestProcess: RequestProcess;
  onSelectTimeMessage: () => void;
  pickersTime: Date;
  minimumDate: Date;
};

export default function IOSDatePicker({
  isShowDateTimePicker,
  onChangeDate,
  setIsShowDateTimePicker,
  requestProcess,
  onSelectTimeMessage,
  minimumDate,
  pickersTime,
}: Props) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isShowDateTimePicker}>
      <View style={styles.modal}>
        <Pressable
          style={styles.emptySpace}
          onPress={setIsShowDateTimePicker}
        />
        <View style={styles.modalContents}>
          <DateTimePicker
            value={pickersTime}
            mode={requestProcess === 'selectTime' ? 'time' : 'date'}
            minuteInterval={10}
            display={requestProcess === 'selectTime' ? 'spinner' : 'inline'}
            style={styles.datePickerStyle}
            onChange={onChangeDate}
            minimumDate={minimumDate}
          />
          {requestProcess === 'selectTime' ? (
            <View style={styles.timePickerButton}>
              <TouchableOpacity
                style={styles.timePickerButton}
                onPress={onSelectTimeMessage}>
                <Text style={styles.timepickerText}>확인</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  modalContents: {
    width: 'auto',
    backgroundColor: '#f3f3f3',
    height: 300,
    marginHorizontal: 63,
    marginVertical: 238,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    position: 'absolute',
    borderRadius: 10,
  },
  emptySpace: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 62,
    paddingVertical: 238,
  },
  datePickerStyle: {
    width: 235,
    height: 250,
    backgroundColor: '#f3f3f3',
  },
  timePickerContainer: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  timePickerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 30,
  },
  timepickerText: {
    color: '#1754FC',
  },
});
