import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TextInputProps,
  Text,
  ListRenderItem,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import useInput from '../hooks/useInput';
import useSearchAddress from '../hooks/useSearchAddress';
import {Address, RoadAddressResult} from '../types/apiTypes';
import LottieView from 'lottie-react-native';
import Font from '../shared/Font';
import {useQuery} from 'react-query';
import {getSearchRoadAddress} from '../api/searchAddress';
import useSearchAddressKeyword from '../hooks/useSearchAddressKeyword';

type Props = {
  onSendAddress: (value: string | undefined) => void;
};

export default function SearchAddress({onSendAddress}: Props) {
  const keyword = useInput();
  const {mutation, addressData, onResetAddressDate} = useSearchAddress();
  const {data, isLoading, mutate, reset} = mutation;
  const {onSetKeyword, searchingKeyword} = useSearchAddressKeyword();
  const onSubmitEdting = async () => {
    await onResetAddressDate();
    mutate({keyword: keyword.value, page: '1'});
  };

  const [currentPage, setCurrentPage] = useState<number>(2);
  const onInfinityScroll = useCallback(
    (info: {distanceFromEnd: number}): void | null | undefined => {
      if (data?.data.results.common.errorCode !== '0') {
        return null;
      }

      const totalAddressCount = Number(data?.data.results.common.totalCount);
      const countPerPage = Number(data?.data.results.common.countPerPage);
      const totalShowingAddressCount = currentPage * countPerPage;
      if (totalShowingAddressCount < totalAddressCount) {
        mutate({
          keyword: keyword.value,
          page: String(currentPage),
        });
        setCurrentPage(currentPage + 1);
      }
    },
    [currentPage, keyword.value, data, mutate],
  );

  const renderItem: ListRenderItem<Address | undefined> = ({item}) => {
    const onPress = () => {
      onSendAddress(item?.roadAddr);
    };
    return (
      <>
        {item === [] ? (
          <View>
            <Text>데이터 없음</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addressSectionContainer}
            onPress={onPress}>
            <View style={styles.iconContainer}>
              <View style={styles.icon}>
                <Image
                  style={styles.iconText}
                  source={require('../../assets/images/plusButton.png')}
                />
              </View>
            </View>
            <View style={styles.addressTextContainer}>
              <Text style={styles.text} ellipsizeMode="tail" numberOfLines={3}>
                {item?.jibunAddr +
                  '\n' +
                  item?.roadAddrPart1 +
                  '\n' +
                  item?.roadAddrPart2}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </>
    );
  };

  const renderFlatList = useMemo(() => {
    return data?.data.results.common.totalCount === '0' ||
      addressData === null ? (
      <View>
        <Text>데이터 없음</Text>
      </View>
    ) : (
      <>
        <FlatList
          style={[styles.flatList, isLoading ? {paddingBottom: 30} : null]}
          data={addressData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}-list`}
          ListHeaderComponent={() => <View style={{marginTop: 20}} />}
          ItemSeparatorComponent={() => <View style={{marginTop: 16}} />}
          onEndReached={onInfinityScroll}
        />
        {isLoading ? (
          <View style={styles.loadingIndicatorOnFlatlist}>
            <LottieView
              source={require('../../assets/images/test1.json')}
              autoPlay
              loop
              autoSize
            />
          </View>
        ) : null}
      </>
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        onSubmitEditing={onSubmitEdting}
        value={keyword.value}
        onChangeText={keyword.onChangeText}
        placeholder={'검색할 주소를 입력해주세요.'}
        returnKeyType="search"
        multiline={false}
        textAlignVertical="center"
        placeholderTextColor={'#9A99A1'}
        selectionColor={'rgba(23, 84, 252, 0.7)'}
      />
      {isLoading && addressData === null ? (
        <View style={styles.loadingIndicator}>
          <LottieView
            source={require('../../assets/images/test1.json')}
            autoPlay
            loop
            autoSize
          />
        </View>
      ) : (
        renderFlatList
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  searchBar: {
    width: '100%',
    paddingHorizontal: 16,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20.27,
    height: 50,
    paddingVertical: 0,
    // padding
    color: '#333333',
    zIndex: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f4',
    fontFamily: Font.NotoRegular,
  },
  flatList: {
    width: '100%',
  },
  addressSectionContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  addressTextContainer: {
    width: '90%',
  },
  iconContainer: {
    justifyContent: 'center',
    marginRight: 8,
  },
  icon: {
    width: 24,
    height: 24,
    backgroundColor: '#1754FC',
    borderRadius: 24,
    justifyContent: 'center',
    padding: 0,
    alignItems: 'center',
  },
  iconText: {
    width: 12,
    height: 12,
  },
  text: {
    fontWeight: '500',
    fontFamily: Font.NotoRegular,
    fontSize: 14,
    lineHeight: 20.27,
  },
  loadingIndicator: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIndicatorOnFlatlist: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
});
