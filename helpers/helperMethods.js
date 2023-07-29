const generateSlug = function (input) {
    // Convert the string to lowercase
    const lowercaseString = input.toLowerCase();
  
    // Remove non-alphanumeric characters and replace them with dashes
    const slug = lowercaseString.replace(/[^a-z0-9]+/g, '-');
  
    // Trim the slug to remove any leading or trailing dashes
    return slug.replace(/^-+|-+$/g, '');
  }

  module.exports = {generateSlug}