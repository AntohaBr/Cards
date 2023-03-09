import {Button} from 'collections-mui'
import {ModalAddPack} from 'common'
import {useAppSelector, useModal} from 'utils'
import {selectAppStatus} from 'store/Selectors'


type ButtonAddPackPropsType = {
    addItem: (name: string, deckCover: string) => void
}


export const ButtonAddPack = (props:ButtonAddPackPropsType) => {
    const status = useAppSelector(selectAppStatus)

    const {isOpen: isAddModalOpen, openModal: openAddModal, closeModal: closeAddModal} = useModal()

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
                addItem={props.addItem}
            />
        </div>
    )
}