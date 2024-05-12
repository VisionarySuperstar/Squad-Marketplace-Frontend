"use client"

interface Props {
    props: string;
}

const SeenIcon = ({ props }: Props) => {
    return (
        <>
            <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.16206 8.5L3.31543 4.7079L4.27709 3.75988L7.16206 6.60395L13.3538 0.5L14.3154 1.44802L7.16206 8.5Z" fill="#322A44" fillOpacity="0.6" />
                <path fillRule="evenodd" clipRule="evenodd" d="M0.31543 4.7079L4.16206 8.5L5.66206 7.02126L4.7004 6.07324L4.16206 6.60395L1.27709 3.75988L0.31543 4.7079ZM5.66206 5.12521L6.62371 6.07324L11.3154 1.44802L10.3538 0.5L5.66206 5.12521Z" fill={props} fillOpacity="0.6" />
            </svg>

        </>
    );
};

export default SeenIcon;



