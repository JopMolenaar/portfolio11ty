
<ul>
  {% for project in projects %}
    <li>
      <h3>{{ project.name }}</h3>
      {% if project.prize %}
        <div>
          <img src="/images/trophy.png" aria-label="{{ project.prize }}" alt="Trophy icon">
          <p>{{ project.prize }}</p>
        </div>
      {% endif %}
      <p>{{ project.littleDesc }}</p>
      <a href="{{ project.linkToRepo }}" target="_blank">GitHub Repo</a>
      {% if project.linkToWebsite %}
        <a href="{{ project.linkToWebsite }}" target="_blank">Visit Website</a>
      {% endif %}
    </li>
  {% endfor %}
</ul>


        <% projects.forEach((project) => { %>
            <li>
              <h3><%= project.name %></h3>
              <% if (project.prize) { %>
                <div>
                  <img src="/images/trophy.png" aria-label="<%= project.prize %>" alt="An image of a trophy">
                  <p><%= project.prize %></p>
                </div>
              <% } %>
              <p><%= project.littleDesc %></p>
              <a href="<%= project.linkToRepo %>" target="_blank">GitHub Repo</a>
              <% if (project.linkToWebsite) { %>
                <a href="<%= project.linkToWebsite %>" target="_blank">Visit Website</a>
              <% } %>
            </li>
          <% }); %>