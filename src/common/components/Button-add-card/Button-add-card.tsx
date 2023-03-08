import {Button} from 'collections-mui'
import {ModalAddNewCard} from 'common/index'
import {useAppSelector, useModal} from 'utils'
import {selectAppStatus} from 'store/Selectors'
import {PostCardType} from 'api/Packs-cards-api'


type ButtonAddCardPropsType = {
    addItem: (postModel: PostCardType) => void
}


export const ButtonAddCard = (props:ButtonAddCardPropsType) => {
    const status = useAppSelector(selectAppStatus)

    const {isOpen: isAddModalOpen, openModal: openAddModal, closeModal: closeAddModal} = useModal()

    return (
        <div>
            <Button onClick={openAddModal} type={'submit'} variant={'contained'}
                    color={'primary'}
                    style={{width: '350px', borderRadius: '90px', margin: '25px'}}
                    disabled={status === 'loading'}>
                Add New Card
            </Button>
            <ModalAddNewCard
                title='Add new card'
                open={isAddModalOpen}
                toggleOpenMode={closeAddModal}
                addItem={props.addItem}
            />
        </div>
    )
}