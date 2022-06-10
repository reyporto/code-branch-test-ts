import TestRenderer from 'react-test-renderer'
import { cleanup, render, fireEvent, act } from '@testing-library/react'
import Home from '..'

const mockResponse = {
    balance: true,
}

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(mockResponse),
    })
)

describe('Home Component', () => {
    afterEach(cleanup)

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('should render Home component', () => {
        const component = TestRenderer.create(<Home />)
        expect(component.toJSON()).toMatchSnapshot()
    })

    test('should submit success - is balanced', async () => {
        const { getByRole, getByPlaceholderText } = render(<Home />)

        const codeInput = getByPlaceholderText(/Code/i)
        act(() => {
            fireEvent.change(codeInput, { target: { value: 'const addOne = value => { return value + 1 }' } })
        })

        const submit = getByRole('button', { name: 'Submit' })
        await act(async () => {
            fireEvent.submit(submit)
        })
    })

    test('should submit success - is not balanced', async () => {
        const { getByRole, getByPlaceholderText } = render(<Home />)
        mockResponse.balance = false

        const codeInput = getByPlaceholderText(/Code/i)
        act(() => {
            fireEvent.change(codeInput, { target: { value: 'const addOne = value => { return value + 1 }}' } })
        })

        const submit = getByRole('button', { name: 'Submit' })
        await act(async () => {
            fireEvent.submit(submit)
        })
    })

    test('should submit exception', async () => {
        const { getByRole, getByPlaceholderText } = render(<Home />)

        global.fetch = jest.fn(() =>
            Promise.reject(new Error('Error!'))
        )

        const codeInput = getByPlaceholderText(/Code/i)
        act(() => {
            fireEvent.change(codeInput, { target: { value: 'const addOne = value => { return value + 1 }}' } })
        })

        const submit = getByRole('button', { name: 'Submit' })
        await act(async () => {
            fireEvent.submit(submit)
        })
    })
})