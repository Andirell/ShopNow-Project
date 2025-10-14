import React from 'react'

export default function MaxwidthContainer( {className, children} ) {
   return (
    <div className={`max-w-[1240px] mx-auto ${className}`}>
        {children}
    </div>
  )
}
