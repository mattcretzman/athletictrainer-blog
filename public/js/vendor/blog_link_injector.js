document.addEventListener('DOMContentLoaded', function() {
  var communityLink = null;
  document.querySelectorAll('a.nav-link').forEach(function(link) {
    if (link.textContent.trim() === 'Community') communityLink = link;
  });
  if (!communityLink) return;
  if (document.querySelector('a.nav-link[href="https://blog.athletictrainerjob.com/blog"]')) return;
  var blogLink = communityLink.cloneNode(true);
  blogLink.textContent = 'Blog';
  blogLink.href = 'https://blog.athletictrainerjob.com/blog';
  var parent = communityLink.parentNode;
  if (parent.tagName === 'LI') {
    var newLi = document.createElement('li');
    newLi.appendChild(blogLink);
    parent.parentNode.insertBefore(newLi, parent.nextSibling);
  } else {
    parent.insertBefore(blogLink, communityLink.nextSibling);
  }
});