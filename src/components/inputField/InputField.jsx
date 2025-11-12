const InputField = (props) => {
    let fieldType = <input
        ref={props.ref}
        type={props.type !== undefined ? props.type : 'text'}
        id={props.id}
        data-regex={props.dataRegex}
        name={props.name}
        maxLength={props.maxLength}
        className={`form-control py-2 px-3 dark:bg-gray-800 dark:text-white ${props.className !== undefined ? props.className : ''}`}
        autoComplete={props.autoComplete}
        onBlur={props.onBlur}
        onInput={props.onInput}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
        value={props.value}
        readOnly={props.readOnly}
        min={props.min}
        max={props.max}
        required={props.isRequired}
        placeholder={props.placeholder}
        disabled={props.disabled}
        data-remove={props.dataRemove}
        data-type={props.dataType}
        data-validation={props.dataValidation}

    />

    if (props.type === "textarea") {
        fieldType = <textarea className={`form-control dark:bg-gray-800 dark:text-white ${props.className !== undefined ? props.className : ''}`} {...props} rows={props.rows !== undefined ? props.rows : 3} />
    };
    const requiredIcon = props.isRequired ? <span className="text-red-600 dark:text-red-400">*</span> : null;
    const errorMsg = <span className={`text-red-600 dark:text-red-400 absolute text-xs right-0`} id={`error-${props.name}`}>{props.errorMessage}</span>
    return (
        <div className="mb-4 col-span-1 relative">
            {props.label && (<label htmlFor={props.id} className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1" >{props.label} {requiredIcon}</label>)}
            {fieldType}

            {errorMsg}
        </div>
    );
};

export default InputField;