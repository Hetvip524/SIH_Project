import React from 'react'
import { Tag } from 'lucide-react';
import '../Design/PublicationCard.css'

const PublicationCard = ({data}) => {
  return (
    <>
    {
        data.map((pub) => 
            <div className="publications-grid">
        <div className="publication-card">
            <h3>{pub.publicationTitle}</h3>
            <p className="publication-abstract">
                {pub.publicationDescription}
            </p>
            <div className="tags">
                {
                    pub.tags && pub.tags.map((tag) => (<div className='eachtag'><Tag className='tagIcon' /><span className="tagText">{tag}</span></div>))
                }
            </div>

        </div>
    </div>)
    }
            
        </>
  )
}

export default PublicationCard