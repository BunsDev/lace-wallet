import React, { useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { WalletAddressList, WalletAddressItemProps } from '@lace/core';
import { Button } from '@lace/common';
import { ContentLayout } from '@src/components/Layout';
import { AddressBookSchema } from '@src/lib/storage';
import { AddressBookEmpty } from '@src/views/browser-view/features/adress-book/components/AddressBookEmpty';
import { withAddressBookContext, useAddressBookContext } from '../context';
import { AddressDetailDrawer } from '../components/AddressDetailDrawer';
import { useAddressBookStore } from '../store';
import styles from './AddressBook.modules.scss';
import DeleteIcon from '../../../assets/icons/delete-icon.component.svg';
import AddIcon from '../../../assets/icons/add.component.svg';
import PlusIcon from '../../../assets/icons/plus-icon.svg';
import EditIcon from '../../../assets/icons/edit.component.svg';
import {
  AnalyticsEventActions,
  AnalyticsEventCategories,
  AnalyticsEventNames
} from '@providers/AnalyticsProvider/analyticsTracker';
import { useAnalyticsContext } from '@providers';
import { AddressDetailsSteps } from './AddressDetailDrawer/types';
import { useHandleResolver } from '@hooks';
import { validateWalletName, validateWalletAddress, validateWalletHandle } from '@src/utils/validators/address-book';
import { HandleProvider } from '@cardano-sdk/core';

const scrollableTargetId = 'popupAddressBookContainerId';

export const AddressBook = withAddressBookContext(() => {
  const { list: addressList, count: addressCount, utils } = useAddressBookContext();
  const { saveRecord: saveAddress, updateRecord: updateAddress, extendLimit, deleteRecord: deleteAddress } = utils;
  const { setIsEditAddressVisible, isEditAddressVisible, setAddressToEdit, addressToEdit } = useAddressBookStore();
  const { t: translate } = useTranslation();
  const analytics = useAnalyticsContext();

  const addressListTranslations = {
    name: translate('core.walletAddressList.name'),
    address: translate('core.walletAddressList.address')
  };

  const handleResolver = useHandleResolver();

  const onAddressSave = (address: AddressBookSchema | Omit<AddressBookSchema, 'id'>): Promise<string> => {
    analytics.sendEvent({
      category: AnalyticsEventCategories.ADDRESS_BOOK,
      action: AnalyticsEventActions.CLICK_EVENT,
      name: AnalyticsEventNames.AddressBook.ADD_ADDRESS_POPUP
    });

    return 'id' in addressToEdit
      ? updateAddress(addressToEdit.id, address, {
          text: translate('browserView.addressBook.toast.editAddress'),
          icon: EditIcon
        })
      : saveAddress(address, {
          text: translate('browserView.addressBook.toast.addAddress'),
          icon: AddIcon
        });
  };

  // continue here
  // const list: WalletAddressItemProps[] = useMemo(() => {
  //   addressList?.map((item: AddressBookSchema) => ({
  //     id: item.id,
  //     address: item.address,
  //     name: item.name,
  //     onClick: (address: AddressBookSchema) => {
  //       analytics.sendEvent({
  //         category: AnalyticsEventCategories.ADDRESS_BOOK,
  //         action: AnalyticsEventActions.CLICK_EVENT,
  //         name: AnalyticsEventNames.AddressBook.VIEW_ADDRESS_DETAILS_POPUP
  //       });
  //       setAddressToEdit(address);
  //       setIsEditAddressVisible(true);
  //     },
  //     isSmall: true,
  //     isAddressWarningVisible: getAddressValidatedWithCallback(item.address) && true
  //   })) || [];
  // }, [addressList, analytics, setAddressToEdit, setIsEditAddressVisible]);

  const list: WalletAddressItemProps[] = useMemo(() => {
    const getAddressValidated = async (address: string): Promise<boolean> =>
      (await validateWalletHandle(address, handleResolver)) === '';

    return (
      addressList?.map(async (item: AddressBookSchema) => ({
        id: item.id,
        address: item.address,
        name: item.name,
        onClick: (address: AddressBookSchema) => {
          analytics.sendEvent({
            category: AnalyticsEventCategories.ADDRESS_BOOK,
            action: AnalyticsEventActions.CLICK_EVENT,
            name: AnalyticsEventNames.AddressBook.VIEW_ADDRESS_DETAILS_POPUP
          });
          setAddressToEdit(address);
          setIsEditAddressVisible(true);
        },
        isSmall: true,
        isAddressWarningVisible: await getAddressValidated(item.address)
      })) || []
    );
  }, [addressList, handleResolver, analytics, setAddressToEdit, setIsEditAddressVisible]);

  const loadMoreData = useCallback(() => {
    extendLimit();
  }, [extendLimit]);

  const addressDrawerInitialStep = (addressToEdit as AddressBookSchema)?.id
    ? AddressDetailsSteps.DETAILS
    : AddressDetailsSteps.CREATE;

  return (
    <>
      <ContentLayout
        title={
          <div className={styles.title}>
            <h1 data-testid="page-title">
              {translate('addressBook.sectionTitle')}{' '}
              <span className={styles.subTitle} data-testid="counter">
                ({addressCount})
              </span>
            </h1>
          </div>
        }
        id={scrollableTargetId}
      >
        <div className={styles.btnContainer}>
          <Button data-testid="add-address-button" color="gradient" block onClick={() => setIsEditAddressVisible(true)}>
            <img src={PlusIcon} alt="plus-icon" />
            {translate('addressBook.empty.addNewAddress')}
          </Button>
        </div>

        {addressCount === 0 ? (
          <div className={styles.emptyScreen} data-testid="empty-address-book">
            <AddressBookEmpty />
          </div>
        ) : (
          <div className={styles.listContainer} data-testid="address-book-list">
            <WalletAddressList
              scrollableTargetId={scrollableTargetId}
              className={styles.addressList}
              items={list}
              loadMoreData={loadMoreData}
              locale={{ emptyText: true }}
              total={addressCount}
              withHeader={false}
              popupView
              translations={addressListTranslations}
            />
          </div>
        )}
      </ContentLayout>
      <AddressDetailDrawer
        initialStep={addressDrawerInitialStep}
        initialValues={addressToEdit}
        onCancelClick={() => {
          setAddressToEdit({} as AddressBookSchema);
          setIsEditAddressVisible(false);
        }}
        onConfirmClick={async (address: AddressBookSchema | Omit<AddressBookSchema, 'id'>) => {
          await onAddressSave(address);
          setAddressToEdit({} as AddressBookSchema);
        }}
        onDelete={(id) =>
          deleteAddress(id, {
            text: translate('browserView.addressBook.toast.deleteAddress'),
            icon: DeleteIcon
          })
        }
        visible={isEditAddressVisible}
        popupView
      />
    </>
  );
});
