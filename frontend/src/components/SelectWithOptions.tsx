import { IUserSeller } from '@/interfaces/IUser';

type Props = {
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  data: IUserSeller[];
  name: string;
  dataTestId: string;
  id: string;
  className: string;
  placeholder: string;
};

export default function SelectWithOptions({
  value,
  onChange,
  data,
  name,
  dataTestId,
  id,
  className,
  placeholder,
  ...otherProps
}: Props) {
  return (
    <select
      data-testid={dataTestId}
      className={className}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      {...otherProps}
    >
      {data.map(({ userName }: IUserSeller) => (
        <option key={userName} value={userName}>
          userName
        </option>
      ))}
    </select>
  );
}
