const Heading = ({title, subtitle, headingClass}) => {
    return (
        <div className={`section-title text-center mb-8`}>
            <h2 className={`uppercase text-4xl font-bold mb-4 pb-4 relative inline-block ${headingClass ? headingClass : 'text-gray-900'}`}>{title}</h2>
            <p className={`text-xl ${headingClass ? headingClass : 'text-gray-900'}`}>{subtitle}</p>
        </div>
    )
}

export default Heading