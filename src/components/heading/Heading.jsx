
export const PageHeading = ({ mainHeadng, description }) => {
    return (
        <div className={`pb-4`}>
            {/* Main Headline */}
            <h1 className={` text-headingColor dark:text-blue-400 text-[23px] font-[700] mb-1`}>{mainHeadng}</h1>

            {/* Description */}
            <p className={`text-gray-600 dark:text-gray-200 font-[400] text-[13px] mb-1`}>{description}</p>
        </div>
    )
}