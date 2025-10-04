import { memo, useState } from "react";
import {
  View,
  Image as RNImage,
  Text,
  ActivityIndicator,
  StyleSheet,
  type ImageStyle,
} from "react-native";

type StreamdownImageProps = {
  uri: string;
  alt?: string;
  style?: ImageStyle;
  theme?: any;
};

const StreamdownImageComponent = ({ uri, alt, style, theme }: StreamdownImageProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoadStart = () => setLoading(true);
  const handleLoadEnd = () => setLoading(false);
  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  if (error) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={styles.errorText}>
          {alt || "Failed to load image"}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={theme?.colors?.primary || "#007AFF"}
          />
        </View>
      )}
      <RNImage
        source={{ uri }}
        style={[
          styles.image,
          style,
          loading && styles.hidden,
        ]}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        accessible={true}
        accessibilityLabel={alt}
        resizeMode="cover"
      />
      {alt && !loading && !error && (
        <Text style={[styles.caption, { color: theme?.colors?.mutedForeground }]}>
          {alt}
        </Text>
      )}
    </View>
  );
};

export const StreamdownImage = memo(
  StreamdownImageComponent,
  (prevProps, nextProps) => prevProps.uri === nextProps.uri && prevProps.alt === nextProps.alt
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  hidden: {
    opacity: 0,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 8,
    height: 200,
  },
  errorContainer: {
    backgroundColor: "rgba(255, 0, 0, 0.1)",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 100,
  },
  errorText: {
    color: "#dc2626",
    textAlign: "center",
  },
  caption: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 4,
  },
});
