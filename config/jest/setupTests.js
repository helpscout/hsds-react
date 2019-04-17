import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { setupTests } from '@helpscout/cyan'

Enzyme.configure({ adapter: new Adapter() })

setupTests()
