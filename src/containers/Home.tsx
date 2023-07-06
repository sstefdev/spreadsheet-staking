import { MagnifyIcon } from '@assets/svg'
import { GenerateTable, SavingNotification, SearchBar } from '@components/common'
import { SpreadsheetTable } from '@components/spreadsheet'

const Home = () => (
  <div className='w-full'>
    <div className='flex items-center justify-between'>
      <h1 className='text-3xl font-bold mb-[14px]'>Your Personal Staking Calculator</h1>
      <SavingNotification />
      <GenerateTable />
    </div>
    <SearchBar
      placeholder='Type a search query to filter'
      icon={<MagnifyIcon className='scale-[1.5] ml-[7px]' />}
    />
    <SpreadsheetTable />
  </div>
)

export default Home
