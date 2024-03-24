import { ComponentProps, FC } from 'react'

export const Em: FC<ComponentProps<'span'>> = (props) => (
  <span className='bg-[#F9C92644] mx-1 p-1' {...props} />
)
