type HeaderProps = {
  total: number;
  done: number;
};

function Header({ total, done }: HeaderProps) {
  return (
    <div>
      <h1>Todo List</h1>
      <p>
        {done} dari {total} selesai
      </p>
    </div>
  );
}

export default Header;