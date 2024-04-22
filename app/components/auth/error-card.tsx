import {Header} from '@/components/auth/header'
import { BackButton } from '@/components/auth/back-button'
import {
    Card,
    CardFooter,
    CardHeader
} from '@/components/ui/card'


export const ErrorCard = () => {
    return (
        <Card>
            <CardHeader>
                <Header label='Ops! Aconteceu algo diferente aqui?' />
            </CardHeader>
            <CardFooter>
                <BackButton 
                    label='Voltar'
                    href='/auth/login'
                />
            </CardFooter>
        </Card>
    )
}
