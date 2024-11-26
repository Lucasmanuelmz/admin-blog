export function CodeElements(props) {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
}

