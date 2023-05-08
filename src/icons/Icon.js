

const Icon = (props) => (
    <div title={props.title} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={props.height}
            width={props.width}
            viewBox={props.viewBox}
            className={props.className}
            fill={props.fill}
            id={props.id}
            xmlSpace={props.xmlSpace}
            strokeWidth={props.strokeWidth}
            stroke={props.stroke}>
            {props.children}
        </svg>
    </div>
);

export default Icon;
