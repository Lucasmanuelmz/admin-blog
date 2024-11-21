export function CodeElements(props) {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
}

export function HeadingElement(props) {
  const levelClass = {
    1: 'heading-1',
    2: 'heading-2',
    3: 'heading-3',
  }[element.level] || '';

  const Tag = `h${props.element.level}`;
  return <Tag {...props.attributes} className={levelClass}>{props.children}</Tag>;
}
