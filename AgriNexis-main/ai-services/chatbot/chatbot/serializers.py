from rest_framework import serializers


class ChatHistoryMessageSerializer(serializers.Serializer):
    role = serializers.ChoiceField(choices=['user', 'assistant'])
    content = serializers.CharField(max_length=10000, trim_whitespace=True)


class ChatRequestSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=10000, trim_whitespace=True, required=True)
    history = ChatHistoryMessageSerializer(many=True, required=False)

    def validate_history(self, value):
        if value is None:
            return []
        if len(value) > 20:
            raise serializers.ValidationError('History cannot exceed 20 messages.')
        return value
