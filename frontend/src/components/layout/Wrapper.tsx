import { ReactNode } from 'react'

type WrapperProps = {
  children: ReactNode
}

const Wrapper = ({ children }: WrapperProps) => (
  <div className='container-bg min-h-screen flex flex-col justify-center'>
    <div className='wrapper rounded-[16px] bg-[#ffffff38] container flex flex-col mx-auto'>
      <main className='flex px-[42px] h-full'>{children}</main>
    </div>
  </div>
)

export default Wrapper
