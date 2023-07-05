import { FC, useState } from 'react'

interface SearchBarProps {
  icon: JSX.Element
  placeholder: string
  value?: string
}

const SearchBar: FC<SearchBarProps> = ({ icon, placeholder }) => {
  const [value, setValue] = useState('')

  return (
    <div className='flex items-center bg-[#F3F3F3] w-full p-[7px] rounded-[5px] mb-[14px]'>
      {icon}
      <input
        className='w-full bg-transparent focus:outline-none ml-[12px] text-l'
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
