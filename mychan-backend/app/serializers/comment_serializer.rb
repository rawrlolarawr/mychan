class CommentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :content
end
