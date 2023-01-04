import type { NextPage } from 'next'
import { MdArrowForward } from 'react-icons/md'

const Kanban: NextPage  = () => {
    return (
        <>
            <div>KANBAN GOES HERE</div>
            <p>In the meantime, check out the old version of my
            <a
            href="https://kanban-ob.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          > Kanban board! <MdArrowForward /></a></p>
        </>
    )
}

export default Kanban
