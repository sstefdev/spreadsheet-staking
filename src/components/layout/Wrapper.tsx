import { FC, ReactNode } from 'react'

type WrapperProps = {
  children: ReactNode
}

const Wrapper: FC<WrapperProps> = ({ children }) => (
  <div className='py-[34px] flex flex-col justify-center'>
    <div className='wrapper rounded-[16px] bg-[#ffffff38] container flex flex-col mx-auto'>
      <main className='flex px-[42px] h-full w-full'>{children}</main>
    </div>
  </div>
)

export default Wrapper
