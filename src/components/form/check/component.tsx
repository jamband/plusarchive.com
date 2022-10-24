import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <div className={props.className}>
    <input
      type="checkbox"
      id={`${props.id}-${props.value}`}
      className="peer h-0 w-0"
      value={props.value}
      {...props.register}
    />
    <label
      htmlFor={`${props.id}-${props.value}`}
      className="inline cursor-pointer rounded bg-gray-700 px-3 py-1 text-gray-400 peer-checked:bg-gray-600 peer-checked:text-gray-100 peer-focus:ring-2"
      role="button" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
    >
      {props.value}
    </label>
  </div>
);
