export default function phonenumberValidate(phonenumber) {
  const phonenumberRegex = /^010[0-9]{8}$/;
  const phonenumberTest = phonenumberRegex.test(phonenumber);

  if (!phonenumberTest) {
    return false;
  }
  return true;
}
