import {Button} from 'collections-mui'
import {ModalAddPack} from 'common'
import {useAppDispatch, useAppSelector, useModal} from 'utils'
import {selectAppStatus} from 'store/Selectors'
import {addNewPack} from 'reducers/Packs-reducer'


export const ButtonAddPack = () => {
    const status = useAppSelector(selectAppStatus)

    const {isOpen: isAddModalOpen, openModal: openAddModal, closeModal: closeAddModal} = useModal()

    const dispatch = useAppDispatch()

    const addNewPackCard = (name: string, deckCover: string) => {
        dispatch(addNewPack({name, deckCover}))
    }

    return (
        <div>
            <Button
                variant={'contained'}
                style={{width: '200px', borderRadius: '90px'}}
                disabled={status === 'loading'}
                onClick={openAddModal}>
                Add new pack
            </Button>
            <ModalAddPack
                title={'Add new pack'}
                open={ isAddModalOpen}
                toggleOpenMode={closeAddModal}
                addItem={addNewPackCard}
            />
        </div>
    )
}