import {Button} from 'collections-mui'
import {ModalAddNewCard} from 'common/index'
import {useState} from 'react'
import {useAppSelector} from 'utils'
import {selectAppStatus} from 'store/Selectors'
import {PostCardType} from 'api/Packs-cards-api'


type ButtonAddCardPropsType = {
    addItem: (postModel: PostCardType) => void
}


export const ButtonAddCard = (props:ButtonAddCardPropsType) => {
    const status = useAppSelector(selectAppStatus)

    const [openAddCardModal, setOpenAddCardModal] = useState(false)

    const onClickButtonAddCardHandler = () => {
        setOpenAddCardModal(true)
    }

    return (
        <div>
            <Button onClick={onClickButtonAddCardHandler} type={'submit'} variant={'contained'}
                    color={'primary'}
                    style={{width: '350px', borderRadius: '90px', margin: '25px'}}
                    disabled={status === 'loading'}>
                Add New Card
            </Button>
            <ModalAddNewCard
                title='Add new card'
                open={openAddCardModal}
                toggleOpenMode={setOpenAddCardModal}
                addItem={props.addItem}
            />
        </div>
    )
}