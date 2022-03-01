export const selectStyles = {
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? "#e94560" : "#edf7f6",
        backgroundColor: state.isSelected ? "#0f3460" : state.isFocused ? "#e94560" : "#0f3460",
    }),
    menuList: (provided, state) => ({
        ...provided,
        backgroundColor: "#16213e",
    }),

    indicatorsContainer: (provided, state) => ({
        ...provided,
        backgroundColor: "#16213e",
    }),

    indicatorSeparator: (provided, state) => ({
        ...provided,
        backgroundColor: "#e94560",
    }),

    valueContainer: (provided, state) => ({
        ...provided,
        backgroundColor: "#16213e",
        marginLeft: 10,
    }),

    singleValue: (provided, state) => ({
        ...provided,
        color: "#edf7f6",
    }),

    dropdownIndicator: (provided, state) => ({
        ...provided,
        color: "#edf7f6",
    }),

    control: (provided, state) => ({
        ...provided,
        backgroundColor: "#16213e",
        borderRadius: 25,
        border: "none",
        marginRight: 1,
        outline: "1px solid #e94560",
        boxSizing: "border-box",
        // borderCollapse: "collapse",
        // borderSpacing: 0,
    }),
};
