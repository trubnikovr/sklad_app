import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { theme } from '../../styles/theme';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
function AjaxLoader({ show = false }) {
  // State to control visibility
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show)
    // Set a timeout to hide the loader after 30 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 30000 * 10); // 30000 milliseconds = 30 seconds

    // Cleanup the timer when the component is unmounted or the visibility changes
    return () => clearTimeout(timer);
  }, [show]); // Depend on the `show` prop so the effect runs again if it changes

  // If not visible, don't render anything
  if (!visible) return null;

  return (
    <View style={{
      position: 'absolute',
      backgroundColor: 'rgba(0,0,0,0.1)', // Make background black with 50% opacity for transparency
      flex: 1,
      height: '100%',
      width: screenWidth,
      zIndex: 999,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
}

export default AjaxLoader; // Don't forget to export your component!
