document.addEventListener('DOMContentLoaded', function() {
  var communityLink = null;
  document.querySelectorAll('a.nav-link').forEach(function(link) {
    if (link.textContent.trim() === 'Community') communityLink = link;
  });
  if (!communityLink) return;
  if (document.querySelector('a.nav-link[href="/blog"]')) return;
  var blogLink = communityLink.cloneNode(true);
  blogLink.textContent = 'Blog';
  blogLink.href = '/blog';
  var parent = communityLink.parentNode;
  if (parent.tagName === 'LI') {
    var newLi = document.createElement('li');
    newLi.appendChild(blogLink);
    parent.parentNode.insertBefore(newLi, parent.nextSibling);
    // Add Webinars link after Blog
    if (!document.querySelector('a.nav-link[href="/webinars"]')) {
      var webinarLink = communityLink.cloneNode(true);
      webinarLink.textContent = 'Webinars';
      webinarLink.href = '/webinars';
      var webinarLi = document.createElement('li');
      webinarLi.appendChild(webinarLink);
      newLi.parentNode.insertBefore(webinarLi, newLi.nextSibling);
    }
  } else {
    parent.insertBefore(blogLink, communityLink.nextSibling);
  }
});